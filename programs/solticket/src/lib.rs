use anchor_lang::prelude::*;

declare_id!("Bn3L15y9EiCGkGYK3nu98jcqw6n8uTjoBWKeJna1eMdm");

pub mod state;
pub mod errors;
pub mod instructions;
pub mod utils;

use crate::instructions::*;
use crate::state::*;

#[program]
pub mod solticket {
    use super::*;

    pub fn create_event(ctx: Context<CreateEvent>, event_data: EventData) -> Result<()> {
        instructions::create_event::create_event(ctx, event_data)
    }

    pub fn update_event_status(ctx: Context<UpdateEventStatus>, new_status: EventStatus) -> Result<()> {
        instructions::update_event_status::update_event_status(ctx, new_status)
    }

    pub fn mint_ticket_nft(ctx: Context<MintTicketNFT>, seat_number: u16) -> Result<()> {
        instructions::mint_ticket_nft::mint_ticket_nft(ctx, seat_number)
    }

    pub fn transfer_ticket(ctx: Context<TransferTicket>) -> Result<()> {
        instructions::transfer_ticket::transfer_ticket(ctx)
    }

    pub fn use_ticket(ctx: Context<UseTicket>) -> Result<()> {
        instructions::use_ticket::use_ticket(ctx)
    }

    pub fn burn_ticket(ctx: Context<BurnTicket>) -> Result<()> {
        instructions::burn_ticket::burn_ticket(ctx)
    }
}