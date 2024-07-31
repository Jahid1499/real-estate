const test = (_req, res) => {
    return res.status(200).json({ status: "User test from controller" })
}

export default test;
