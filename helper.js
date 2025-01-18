module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },

    getCardNumber: function() {
        const card = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
        return `${card}`

    },

    getCVC: function() {
        const cvc = Math.floor(100 + Math.random() * 900)
        return `${cvc}`
    }
};
