use anchor_lang::prelude::*;

declare_id!("3ACETbVphkSQQ5WW82ArvnyFLDSrooVX6C77SL3UcXLB");

#[program]
pub mod solticket {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
