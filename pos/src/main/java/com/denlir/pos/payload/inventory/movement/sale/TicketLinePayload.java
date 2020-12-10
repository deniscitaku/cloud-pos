package com.denlir.pos.payload.inventory.movement.sale;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

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
