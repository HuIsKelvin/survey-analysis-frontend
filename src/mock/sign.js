const userMap = {
  test: {
    name: "test",
    token: "test",
    password: "test"
  }
};

export default {
  login: config => {
    const username = JSON.parse(config.body)["name"];
    return userMap[username];
  }
};
