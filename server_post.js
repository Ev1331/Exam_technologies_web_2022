

app.use(express.urlencoded());

// Send message for default URL
app.get('/', (req, res) => {
    res.render("form.ejs");
});

app.post("/", () => {
    console.log(req.body);
    res.send("Hello " + req.body.myname);
})

//Launch app to listen to specified port
app.listen(8000, function () {
    console.log("Running on port 8000")
})