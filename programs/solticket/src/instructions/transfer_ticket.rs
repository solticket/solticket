use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

use crate::state::*;
// use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct TransferTicket<'info> {
    #[account(mut)]
    pub ticket_nft: Account<'info, TicketNFT>,
    #[account(mut)]
    pub from: Signer<'info>,
    /// CHECK: This is safe as we're only transferring to this account
    pub to: AccountInfo<'info>,
    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn transfer_ticket(ctx: Context<TransferTicket>) -> Result<()> {
    let ticket_nft = &mut ctx.accounts.ticket_nft;

    // require!(ticket_nft.owner == ctx.accounts.from.key(), ErrorCode::NotTicketOwner);
    // require!(ticket_nft.status == NFTStatus::MINTED, ErrorCode::TicketNotTransferable);

    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.from_token_account.to_account_info(),
                to: ctx.accounts.to_token_account.to_account_info(),
                authority: ctx.accounts.from.to_account_info(),
            },
        ),
        1,
    )?;

    ticket_nft.owner = ctx.accounts.to.key();
    ticket_nft.status = NFTStatus::TRANSFERRED;

    Ok(())
}