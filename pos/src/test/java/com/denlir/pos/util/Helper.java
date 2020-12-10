package com.denlir.pos.util;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Objects;
import java.util.function.Supplier;

public class Helper {

    public static <S> Object callGetter(Supplier<S> supplier, String fieldName) {
        S object = supplier.get();
        try {
            return new PropertyDescriptor(fieldName, object.getClass()).getReadMethod().invoke(object);
        } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
            throw new RuntimeException("Couldn't call the getter method for field: " + fieldName, e);
        }
    }

    public static <T> boolean haveSamePropertyValues(Class<?> type, T t1, T t2) {
        try {
            BeanInfo beanInfo = Introspector.getBeanInfo(type);
            for (PropertyDescriptor pd : beanInfo.getPropertyDescriptors()) {
                Method m = pd.getReadMethod();
                Object o1 = m.invoke(t1);
                Object o2 = m.invoke(t2);
                if (!Objects.equals(o1, o2)) {
                    return false;
                }
            }
        } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
            throw new RuntimeException("Couldn't get value from object of class: " + type.getName() + "\nFirst parameter: " + t1 + "\nSecond parameter: " + t2, e);
        }
        return true;
    }

}
