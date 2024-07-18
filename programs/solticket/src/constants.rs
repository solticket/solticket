<<<<<<< HEAD
use anchor_lang::prelude::*;
use std::str::FromStr;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum EventStatus {
    CREATE,
    SALE,
    RUN,
    CLOSED,
    CANCELLED
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum Category {
    PHYSICAL, 
    VIRTUAL
}

impl FromStr for Category {
    type Err = ProgramError;

    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        match s.to_uppercase().as_str() {
            "PHYSICAL" => Ok(Category::PHYSICAL),
            "VIRTUAL" => Ok(Category::VIRTUAL),
            _ => Err(ProgramError::InvalidInstructionData),
        }
    }
}
=======

>>>>>>> main
