const isZipCode = (zip) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(zip);
};

export default isZipCode;