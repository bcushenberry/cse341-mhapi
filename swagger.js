const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Monster Hunter API',
        description: 'Project #2 for CSE341'
    },
    host: 'cse341-mhapi.onrender.com',
    schemes: ['https'],
    definitions: {
        CreateArmor: {
            name: 'ArmorName',
            type: 'ArmorType',
            slots: '3',
            rank: '1',
            defense: '10'
        },
        UpdateArmor: {
            name: 'ArmorName',
            type: 'ArmorType',
            slots: '3',
            rank: '1',
            defense: '10'
        },
        CreateWeapon: {
            name: 'WeaponName',
            type: 'WeaponType',
            slots: '3',
            rank: '1',
            attack: '10',
            element: 'fire',
            sharpness: '20'
        },
        UpdateWeapon: {
            name: 'WeaponName',
            type: 'WeaponType',
            slots: '3',
            rank: '1',
            attack: '10',
            element: 'fire',
            sharpness: '20'
        }
    }
};

const outputFile = './swagger.json';
const route = ['./routes/index'];

swaggerAutogen(outputFile, route, doc);