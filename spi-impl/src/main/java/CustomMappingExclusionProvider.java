import org.mapstruct.ap.spi.MappingExclusionProvider;

import javax.lang.model.element.TypeElement;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

public class CustomMappingExclusionProvider implements MappingExclusionProvider {

  @Override
  public boolean isExcluded(TypeElement typeElement) {
    if (typeElement.getAnnotation(OneToOne.class) != null) {
      OneToOne annotation = typeElement.getAnnotation(OneToOne.class);
      return annotation.fetch() == FetchType.LAZY;
    } else if (typeElement.getAnnotation(OneToMany.class) != null) {
      OneToMany annotation = typeElement.getAnnotation(OneToMany.class);
      return annotation.fetch() == FetchType.LAZY;
    } else if (typeElement.getAnnotation(ManyToMany.class) != null) {
      ManyToMany annotation = typeElement.getAnnotation(ManyToMany.class);
      return annotation.fetch() == FetchType.LAZY;
    }

    return false;
  }
}
