package com.denlir.pos.payload.inventory.movement.sale;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.validation.groups.ReferenceId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.groups.ConvertGroup;

/**
 * Created on: 2/29/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
@FluentBuilder
public class TicketLinePayload extends BaseLinePayload {

}
