use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct UseTicket<'info> {
    #[account(mut)]
    pub ticket_nft: Account<'info, TicketNFT>,
    pub owner: Signer<'info>,
    #[account(mut)]
    pub event: Account<'info, Event>,
}

pub fn use_ticket(ctx: Context<UseTicket>) -> Result<()> {
    let ticket_nft = &mut ctx.accounts.ticket_nft;
    let _event = &ctx.accounts.event;

    require!(ticket_nft.owner == ctx.accounts.owner.key(), ErrorCode::NotTicketOwner);
    // require!(
    //     ticket_nft.status == NFTStatus::MINTED || ticket_nft.status == NFTStatus::TRANSFERRED,
    //     ErrorCode::TicketAlreadyUsed
    // );

    ticket_nft.status = NFTStatus::USED;

    Ok(())
}