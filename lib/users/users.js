users = [{    name: "Ken",
          password: "326"}];

function addUser(userData) {
  userData.date = new Date();
  users.push(userData);
  users.sort(function (u1, u2) {
    return u1.name < u2.name;
  });
}

exports.addUser = addUser;

function validateUser(res, username, password) {
  if (username === null)
    res.render("login", {errmsg: "We gonna check, are you human?"});
  else
    if (password === null)
      res.render("login", {name: username,
                         errmsg: "Wrong password"});
    else
      res.render("index", {first: "Home",
                          second: "Connect",
                           third: "Discover",
                           forth: "Me",
                           fifth: "Search",
                           sixth: "Setting",
                            last: "NewTweet",
                           login: true,
                            name: username});
}

exports.validateUser = validateUser;
