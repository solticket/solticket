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


    pub fn mint_ticket_nft(ctx: Context<MintTicketNFT>) -> Result<()> {
        instructions::mint_ticket_nft::mint_ticket_nft(ctx)
    }

    // pub fn transfer_ticket(ctx: Context<TransferTicket>) -> Result<()> {
    //     instructions::transfer_ticket::transfer_ticket(ctx)
    // }

    pub fn use_ticket(ctx: Context<UseTicket>) -> Result<()> {
        instructions::use_ticket::use_ticket(ctx)
    }

    // pub fn get_user_tickets(ctx: Context<GetUserTickets>) -> Result<Vec<TicketInfo>> {
    //     instructions::get_user_tickets::get_user_tickets(ctx)
    // }
}


