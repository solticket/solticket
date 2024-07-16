use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The event is sold out")]
    SoldOut,

    #[msg("The event is not on sale")]
    EventNotOnSale,

    #[msg("The ticket does not belong to this event")]
    TicketNotForThisEvent,

    #[msg("The ticket has already been used")]
    TicketAlreadyUsed,

    #[msg("The ticket has not been used yet")]
    TicketNotUsed,

    #[msg("The user is not the ticket owner")]
    NotTicketOwner,

    #[msg("The user is not the event authority")]
    NotEventAuthority,

    #[msg("Invalid resale price")]
    InvalidResalePrice,

    #[msg("Insufficient funds to purchase the ticket")]
    InsufficientFunds,

    #[msg("Error during fund transfer")]
    TransferError,

    #[msg("Error during NFT creation")]
    NFTCreationError,

    #[msg("Error during NFT transfer")]
    NFTTransferError,

    #[msg("Error during NFT burning")]
    NFTBurnError,

    #[msg("The collection is full")]
    CollectionFull,

    #[msg("Invalid supply")]
    InvalidSupply,

    #[msg("Invalid category")]
    InvalidCategory,

    #[msg("Event deadline has passed")]
    EventDeadlinePassed,

    #[msg("Invalid event status transition")]
    InvalidStatusTransition,

    #[msg("Unauthorized operation")]
    Unauthorized,

    #[msg("Invalid ticket price")]
    InvalidTicketPrice,

    #[msg("Event capacity exceeded")]
    EventCapacityExceeded,

    #[msg("Invalid event duration")]
    InvalidEventDuration,

    #[msg("Metadata creation error")]
    MetadataCreationError,

    #[msg("Arweave upload error")]
    ArweaveUploadError,
}