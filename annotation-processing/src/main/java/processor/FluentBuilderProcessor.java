package processor;

import annotation.FluentBuilder;
import com.google.auto.service.AutoService;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.Processor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Name;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.util.ElementFilter;
import javax.lang.model.util.Types;
import javax.tools.Diagnostic;
import javax.tools.JavaFileObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created on: 7/21/20
 *
 * @author Denis Citaku
 **/
@SupportedAnnotationTypes({"annotation.FluentBuilder"})
@AutoService(Processor.class)
public class FluentBuilderProcessor extends AbstractProcessor {

    @Override
    public SourceVersion getSupportedSourceVersion() {
        return SourceVersion.latestSupported();
    }

    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        Set<TypeElement> elementsAnnotatedWith = (Set<TypeElement>) roundEnv.getElementsAnnotatedWith(FluentBuilder.class);

        elementsAnnotatedWith.forEach(element -> {
            boolean hasNoArgsConstructor = element.getEnclosedElements()
                    .stream()
                    .filter(x -> x instanceof ExecutableElement)
                    .map(x -> (ExecutableElement) x)
                    .anyMatch(x -> x.getParameters().size() == 0);

            if (!hasNoArgsConstructor) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "Class: " + element.getSimpleName().toString() +
                                " is annotated with @FluentBuilder but does not have no-args constructor");
            }
        });

        Map<Name, Set<String>> excludedFieldsByName = elementsAnnotatedWith.stream()
                .collect(Collectors.toMap(Element::getSimpleName, x -> Set.of(x.getAnnotation(FluentBuilder.class).optionalFields())));

        Map<TypeElement, List<VariableElement>> superClassRequiredFields = elementsAnnotatedWith
                .stream()
                .collect(Collectors.toMap(x -> x, x -> ElementFilter.fieldsIn(((DeclaredType) x.getSuperclass()).asElement().getEnclosedElements()
                        .stream()
                        .filter(Objects::nonNull)
                        .filter(y -> y.getKind().isField())
                        .filter(y -> y.getAnnotation(FluentBuilder.Optional.class) == null)
                        .collect(Collectors.toList())
                )));

        Map<Name, List<VariableElement>> superClassOptionalFields = elementsAnnotatedWith
                .stream()
                .collect(Collectors.toMap(TypeElement::getSimpleName, x -> ElementFilter.fieldsIn(((DeclaredType) x.getSuperclass()).asElement().getEnclosedElements()
                        .stream()
                        .filter(Objects::nonNull)
                        .filter(y -> y.getKind().isField())
                        .filter(y -> y.getAnnotation(FluentBuilder.Optional.class) != null)
                        .collect(Collectors.toList())
                )));

        Map<TypeElement, List<VariableElement>> requiredFieldsByClassName = elementsAnnotatedWith.stream()
                .collect(Collectors.toMap(x -> (TypeElement) x, x -> ElementFilter.fieldsIn(x.getEnclosedElements()).stream()
                        .filter(Objects::nonNull)
                        .filter(y -> y.getKind().isField())
                        .filter(y -> y.getAnnotation(FluentBuilder.Optional.class) == null)
                        .filter(y -> !excludedFieldsByName.getOrDefault(y.getEnclosingElement().getSimpleName(), Set.of()).contains(y.getSimpleName().toString()))
                        .collect(Collectors.toCollection(() -> superClassRequiredFields.getOrDefault(x, List.of())))));

        Map<Name, List<VariableElement>> optionalFieldsByClassName = elementsAnnotatedWith.stream()
                .collect(Collectors.toMap(Element::getSimpleName, x -> ElementFilter.fieldsIn(x.getEnclosedElements()).stream()
                        .filter(Objects::nonNull)
                        .filter(y -> y.getKind().isField())
                        .filter(y -> y.getAnnotation(FluentBuilder.Optional.class) != null)
                        .collect(Collectors.toCollection(() -> superClassOptionalFields.getOrDefault(x.getSimpleName(), List.of())))));

        optionalFieldsByClassName.values().forEach(x -> x.sort(Comparator.comparingInt(y -> y.getAnnotation(FluentBuilder.Optional.class).order())));
        //requiredFieldsByClassName.forEach((element, list) -> list.addAll(superClassRequiredFields.getOrDefault(element, List.of())));
        //optionalFieldsByClassName.forEach(((name, variableElements) -> variableElements.addAll(superClassOptionalFields.getOrDefault(name, List.of()))));

        requiredFieldsByClassName.forEach((typeElement, requiredFields) -> {
            if (requiredFields.isEmpty()) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                        "Class: " + typeElement.toString() +
                                " is annotated with @FluentBuilder but does not have any fields annotated with @Required");
            }
            try {
                writeBuilderFile(typeElement, requiredFields, optionalFieldsByClassName.get(typeElement.getSimpleName()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return true;
    }

    private void writeBuilderFile(TypeElement typeElement, List<VariableElement> requiredFields, List<VariableElement> optionalFields) throws IOException {
        String packageName = processingEnv.getElementUtils().getPackageOf(typeElement).getQualifiedName().toString();
        String className = typeElement.getSimpleName().toString();
        String builderClassName = className.substring(0, className.indexOf("Payload")) + "FluentBuilder";

        JavaFileObject builderFile = processingEnv.getFiler().createSourceFile(builderClassName);

        try (PrintWriter out = new PrintWriter(builderFile.openWriter())) {

            out.print("package ");
            out.print(packageName);
            out.println(";");
            out.println();

            if (typeElement.getQualifiedName() != null) {
                out.println("import " + typeElement.getQualifiedName().toString() + ";");
                out.println();
            }

            out.print("public class ");
            out.print(builderClassName);
            out.println(" {");
            out.println();

            // Builder method
            out.println(format(1, "public static Builder builder() {"));
            out.print(format(2, "return "));
            for (int i = 0; i < requiredFields.size(); i++) {
                if (i + 1 == requiredFields.size()) {
                    AtomicInteger index = new AtomicInteger(0);
                    String assignValues = requiredFields.stream()
                            .map(x -> format(3, formatSetter(x, "x" + index.getAndIncrement())))
                            .collect(Collectors.joining("\n"));

                    out.println(format(0, "x%s -> { \n\t\t\t%s obj = new %s();", i, className, className));
                    out.println(assignValues);
                    if (optionalFields.isEmpty()) {
                        out.println(format(3, "return obj;"));
                    } else {
                        for (int j = 0; j < optionalFields.size(); j++) {
                            int k = 5 + j;
                            int l = 6 + j;
                            String fieldName = optionalFields.get(j).getSimpleName().toString();
                            String fieldType = optionalFields.get(j).asType().toString();
                            out.println(format(3 + j, "return new Builder.%sOptionalStage%s() {", className, j + 1));
                            out.println(format(4 + j, "public %s build() {", className));
                            optionalFields.stream()
                                    .limit(j)
                                    .forEach(x -> out.println(format(k, formatSetter(x))));
                            out.println(format(5 + j, "return obj;"));
                            out.println(format(4 + j, "}\n"));
                            if (j + 1 == optionalFields.size()) {
                                out.println(format(4 + j, "public %s %s(%s %s) {", className, fieldName, fieldType, fieldName));
                                optionalFields.stream()
                                        .limit(j + 1)
                                        .forEach(x -> out.println(format(l, formatSetter(x))));
                                out.println(format(5 + j, "return obj;"));
                                out.println(format(4 + j, "}\n"));
                            } else {
                                out.println(format(4 + j, "public Builder.%sOptionalStage%s %s(%s %s) {", className, j + 2, fieldName, fieldType, fieldName));
                            }
                        }

                        for (int j = optionalFields.size(); j > 0; j--) {
                            out.println(format(2 + j, "};"));
                            if (j > 1) {
                                out.println(format(1 + j, "}"));
                            }
                        }
                    }
                    out.println(format(2, "};"));
                } else {
                    out.print("x" + i + " -> ");
                }
            }
            out.println("\t}");

            out.println();

            // Defining Builder interface
            out.println("\tpublic interface Builder {");
            for (int i = 0; i < requiredFields.size(); i++) {
                VariableElement field = requiredFields.get(i);
                String fieldName = field.getSimpleName().toString();
                String fieldType = field.asType().toString();
                String nextStageOrClass;
                if (i + 1 == requiredFields.size()) {
                    nextStageOrClass = optionalFields.size() > 0 ? format(0, "%sOptionalStage1", className) : className;
                }
                else {
                    nextStageOrClass = format(0, "%sStage%s", className, i + 1);
                }
                if (i == 0) {
                    out.println(format(2, "%s %s(final %s %s);", nextStageOrClass, fieldName, fieldType.replaceAll(",@", " @"), fieldName));
                } else {
                    out.println(format(2, "interface %sStage%s {", className, i));
                    out.println(format(3, "%s %s(final %s %s);", nextStageOrClass, fieldName, fieldType.replaceAll(",@", " @"), fieldName));
                    out.println(format(2, "}"));
                }
                out.println();
            }
            for (int i = 0; i < optionalFields.size(); i++) {
                VariableElement field = optionalFields.get(i);
                String fieldName = field.getSimpleName().toString();
                String fieldType = field.asType().toString();
                String nextStageOrClass = i + 1 == optionalFields.size() ? className : format(0, "%sOptionalStage%s", className, i + 2);
                out.println(format(2, "interface %sOptionalStage%s {", className, i + 1));
                out.println(format(3, "%s build();", className));
                out.println();
                out.println(format(3, "%s %s(final %s %s);", nextStageOrClass, fieldName, fieldType.replaceAll(",@", " "), fieldName));
                out.println(format(2, "}"));
                out.println();
            }
            out.println("\t}");

            // End of the class
            out.println("}");
        }
    }

    private static String format(int nrOfTabs, String value, Object... values) {
        List<Object> list = Stream.of(values).collect(Collectors.toList());
        list.add(0, Stream.generate(() -> "\t").limit(nrOfTabs).collect(Collectors.joining()));

        return String.format("%s".concat(value), list.toArray());
    }

    private String formatSetter(VariableElement element) {
        String elementName = element.getSimpleName().toString();
        String setter = findSetterMethod(element);

        return String.format("obj.%s(%s);", setter, elementName);
    }

    private String formatSetter(VariableElement element, String param) {
        String setter = findSetterMethod(element);

        return String.format("obj.%s(%s);", setter, param);
    }

    private String findSetterMethod(VariableElement element) {
        String fieldName = element.getSimpleName().toString();
        if (fieldName.startsWith("is")) {
            fieldName = fieldName.substring(2);
        }
        return String.format("set%s", fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
    }
}
