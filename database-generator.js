const faker = require('faker');
const fs = require('fs');

const NUMBER_OF_FISHERMANS = 5;
const NUMBER_OF_CATCHES = 20;


generateFisherman = (id) => {
    return  {
        id: id,
        equipment: faker.lorem.sentence(7,2),
        baits: faker.lorem.sentence(7,2),
        techniques: faker.lorem.sentence(7,2),
        poles: faker.lorem.words(3),
        contact: {
            tel: faker.phone.phoneNumber(),
            name: faker.name.findName(),
            address: {
                zipCode: faker.address.zipCode(),
                street: faker.address.streetName(),
                city: faker.address.city(),
                houseNumber: 23
            }
        }
    };
};

let fishermans = [];
for(i=0; i < NUMBER_OF_FISHERMANS; i++){
    fishermans.push(generateFisherman(i));
}

generateCatch = (id) => {     
    return {
        id: id,
        timestamp: faker.random.number({min:2000,max:2020})+"-"+faker.random.number({min:1,max:12})+"-"+faker.random.number({min:1,max:28}),
        location: faker.address.state(),
        weight: faker.random.number(),
        species: faker.random.word(),
        fishermanId: faker.random.number({min:0, max:NUMBER_OF_FISHERMANS})
    };
}

let catches = [];
for(i=0; i < NUMBER_OF_CATCHES; i++){
    catches.push(generateCatch(i));
}

fs.writeFile(
    'database.fake.json',
    JSON.stringify({fishermans: fishermans, catches: catches}),
    (err)=>{console.log(err)}
    );