use anchor_lang::prelude::*;
use strum_macros::EnumString;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum EventStatus {
    CREATE,
    SALE,
    RUN,
    CLOSED,
    CANCELLED
}


#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq, EnumString)]
pub enum Category {
    PHYSICAL,
    VIRTUAL
}
