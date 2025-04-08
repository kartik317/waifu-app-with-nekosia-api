const fetchData = async () => {
    try {
        const res = await fetch('https://api.nekosia.cat/api/v1/images/nothing?count=10&additionalTags=fox-ears,smile&blacklistedTags=sunaookami-shiroko,cute,blue-eyes');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err.stack);
        return null;
    }
};

const fetchZerotwoImage =  async () => {
    try {
        const res = await fetch('https://zerotwoapi.onrender.com/api/images');
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("bhdss");
        console.error(err.stack);
        return null;
    }
}

export default { fetchData, fetchZerotwoImage };