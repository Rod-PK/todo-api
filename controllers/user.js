export const registerUser = (req, res, next) => {
    res.json("User registered!");
}

export const userLogin = (req, res, next) => {
    res.json("Login successful!");
}

export const userLogout = (req, res, next) => {
    res.json("User Logged out!");
}