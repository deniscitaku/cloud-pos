package com.denlir.pos.entity.domain;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@Document("locations")
public class Location {

  @Id
  private String id;

  @Indexed(unique = true)
  private String name;

  private Map<MovementKind, Long> sequenceByMovementKind;

}
