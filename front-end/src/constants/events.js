export const USDC = {
    isCoin: true,
    isInsurer: false,
    name: "USDC",
    abbr: "USDC",
    address: "0xaFF4481D10270F50f203E0763e2597776068CBc5", // Weth address
};
export const WETH = {
    isCoin: true,
    isInsurer: false,
    name: "WRAPPED ETHEREUM",
    abbr: "WETH",
    address: "0xaFF4481D10270F50f203E0763e2597776068CBc5", // Weth address
};

export const WBTC = {
    isCoin: true,
    isInsurer: false,
    name: "WRAPPED BITCOIN",
    abbr: "WBTC",
    address: "0xaFF4481D10270F50f203E0763e2597776068CBc5", // Weth address
};
export const DEADLINE = [
    {
        name: "1 December, 2022"
    },
    {
        name: "1 June, 2023"
    },
    {
        name: "1 December, 2023"
    },
    {
        name: "1 December, 2024"
    },
];

export const EVENTADDR = [
    {
        event: "0x1FbF370cd78dB6023a29471a9B81E81C615601Dd",
        exchnge: "0xdE37588BE3d92bC80BD55db7B6ECd95714c44DbA",
    },
    {
     event: "0x1FbF370cd78dB6023a29471a9B81E81C615601Dd",
        exchnge: "0xdE37588BE3d92bC80BD55db7B6ECd95714c44DbA",
    },
    {
     event:   "0x1FbF370cd78dB6023a29471a9B81E81C615601Dd",
     exchnge: "0xdE37588BE3d92bC80BD55db7B6ECd95714c44DbA",
    }
];

export const ORACLE = [
    {
        name: "ETH/USDT < 1900",
    },
    {
        name: "BTC/USDT < 9000",
    }
]

export const ALLEVENTS = [
    {
     name: ORACLE[0].name,
     array:  [
         {
             name: USDC.name,
             array: [{name: DEADLINE[0].name,
                 array: [EVENTADDR[0].event, EVENTADDR[0].exchnge]
             }, ]
         },
         {
             name: WBTC.name,
             array: [{name: DEADLINE[1].name,
                 array: [EVENTADDR[1].event, EVENTADDR[1].exchnge]
             }]
         }
         ]
    },

    {
     name: ORACLE[1].name,
     array: [
         {  name: USDC.name,
            array: [
                {
             name: DEADLINE[0].name,
                array: [EVENTADDR[2].event, EVENTADDR[2].exchnge]
             }
         ]
         },
          ]
    }

]