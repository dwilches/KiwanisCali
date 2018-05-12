
sendMailCloudFunction(
    {
        method: "POST",
        body: {name: "Name", email: "me@me.me", message: "Message", phone: "Phone"},
    },
    {
        status: () => ({ send: () => {}}),
        set: () => {},
    });
