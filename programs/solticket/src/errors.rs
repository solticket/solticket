use anchor_lang::prelude::*;

#[error_code]pub enum ErrorCode {
    #[msg("The event is not on sale")]
    EventNotOnSale,
    #[msg("All tickets have been sold out")]
    SoldOut,
    #[msg("You are not the owner of this ticket")]
    NotTicketOwner,
    #[msg("The ticket is not transferable")]
    TicketNotTransferable,
    #[msg("The event is not running")]
    EventNotRunning,
    #[msg("The ticket has already been used")]
    TicketAlreadyUsed,
    #[msg("The ticket has already been burned")]
    TicketAlreadyBurned,
    #[msg("Invalid event status transition")] 
    InvalidStatusTransition, 
    #[msg("Invalid Mint Event Deadline Passed")]
    EventDeadlinePassed, 
    #[msg("Only the owner can sign")]
    Unauthorized, 
}


