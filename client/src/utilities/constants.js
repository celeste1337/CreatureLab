const prod = {
    url: {
        API_URL: `https://capstone-testzone.herokuapp.com`
    }
};

const dev = {
    url: {
        API_URL: `http://localhost:5000`
    }
};

export const config = process.env.REACT_APP_ENV === `development` ? dev : prod;