use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};
use metaplex_token_metadata::instruction::create_metadata_accounts_v2;

#[derive(Accounts)]
pub struct MintTicket<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(init, payer = payer, mint::decimals = 0, mint::authority = payer)]
    pub ticket_mint: Account<'info, Mint>,
    #[account(init, payer = payer, token::mint = ticket_mint, token::authority = payer)]
    pub ticket_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>,
    pub metadata_program: AccountInfo<'info>,
}

impl<'info> MintTicket<'info> {
    fn mint_ticket(&self, ctx: Context<MintTicket>, event_id: u64) -> Result<()> {
        let metadata_seeds = &[
            b"metadata",
            self.metadata_program.key.as_ref(),
            self.ticket_mint.key().as_ref(),
        ];
        let metadata_bump =
            Pubkey::find_program_address(metadata_seeds, &self.metadata_program.key).1;

        let metadata_accounts = create_metadata_accounts_v2(
            self.metadata_program.clone(),
            self.ticket_mint.key(),
            self.payer.key(),
            self.payer.key(),
            self.payer.key(),
            "Event Ticket".to_string(),
            "TICKET".to_string(),
            "https://example.com/ticket.png".to_string(),
            None,
            1,
            true,
            true,
            None,
            Some(vec![]),
        );

        invoke_signed(
            &metadata_accounts,
            &[
                self.ticket_mint.to_account_info(),
                self.ticket_account.to_account_info(),
                self.payer.to_account_info(),
                self.system_program.to_account_info(),
                self.rent.to_account_info(),
                self.token_program.to_account_info(),
            ],
            &[&metadata_seeds],
        )?;

        token::mint_to(
            CpiContext::new(
                self.token_program.to_account_info(),
                MintTo {
                    mint: self.ticket_mint.to_account_info(),
                    to: self.ticket_account.to_account_info(),
                    authority: self.payer.to_account_info(),
                },
            ),
            1,
        )?;

        Ok(())
    }
}
