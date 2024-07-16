/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solticket.json`.
 */
export type IDL = {
  address: "3ACETbVphkSQQ5WW82ArvnyFLDSrooVX6C77SL3UcXLB";
  metadata: {
    name: "solticket";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "createEvent";
      discriminator: [49, 219, 29, 203, 22, 98, 100, 87];
      accounts: [
        {
          name: "event";
          writable: true;
          signer: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "location";
          type: "string";
        },
        {
          name: "category";
          type: "string";
        },
        {
          name: "deadline";
          type: "u64";
        },
        {
          name: "ticketCount";
          type: "u32";
        }
      ];
    },
    {
      name: "updateStatusDeadline";
      discriminator: [145, 5, 165, 0, 93, 242, 34, 150];
      accounts: [
        {
          name: "event";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["event"];
        }
      ];
      args: [
        {
          name: "deadline";
          type: "u64";
        }
      ];
    },
    {
      name: "updateStatusEvent";
      discriminator: [157, 248, 179, 35, 36, 226, 226, 228];
      accounts: [
        {
          name: "event";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["event"];
        }
      ];
      args: [
        {
          name: "status";
          type: {
            defined: {
              name: "eventStatus";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "event";
      discriminator: [125, 192, 125, 158, 9, 115, 152, 233];
    }
  ];
  types: [
    {
      name: "category";
      type: {
        kind: "enum";
        variants: [
          {
            name: "physical";
          },
          {
            name: "virtual";
          }
        ];
      };
    },
    {
      name: "event";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "title";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "location";
            type: "string";
          },
          {
            name: "category";
            type: {
              defined: {
                name: "category";
              };
            };
          },
          {
            name: "deadline";
            type: "u64";
          },
          {
            name: "ticketCount";
            type: "u32";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "eventStatus";
              };
            };
          }
        ];
      };
    },
    {
      name: "eventStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "create";
          },
          {
            name: "sale";
          },
          {
            name: "run";
          },
          {
            name: "closed";
          },
          {
            name: "cancelled";
          }
        ];
      };
    }
  ];
};
