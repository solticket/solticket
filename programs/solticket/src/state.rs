use anchor_lang::prelude::*;
use strum_macros::EnumString;


#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString)]
pub enum EventStatus {
    CREATE,
    SALE,
    RUN,
    CLOSED,
    CANCELLED
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString)]
pub enum Category {
    PHYSICAL, 
    VIRTUAL
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString)]
pub enum CollectionStatus {
    CREATED,
    ACTIVE,
    PAUSED,
    COMPLETED,
    CANCELLED
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, EnumString)]
pub enum NFTStatus {
    MINTED,
    LISTED,
    TRANSFERRED,
    USED,
    BURNED
}

