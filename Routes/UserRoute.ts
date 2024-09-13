import { Router, Request, Response } from "express";
import userInfo from "../mongoschema/usermongotype";



const router = Router();

// Use query parameters for useremail and password
router.get("/", async (req: Request, res: Response) => {
    const { password, useremail } = req.query;  // Access query parameters
    
    
    // Ensure that password and useremail are provided
    if (!password || !useremail) {
        return res.status(400).send({ error: "Missing password or useremail" });
    }

    try {
        // Fetch user info from the database
        const getUser = await userInfo.findOne({ userPassword: password, userEmail: useremail });
        
        if (!getUser) {
            return res.status(404).send({ error: "User not found" });
        }

        console.log(getUser);

        // Send the found user information back as a response
        res.send(getUser);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ error: "An error occurred while fetching user information" });
    }
});

router.post("/", (req: Request, res: Response) => {
    // Handle POST request
    const { username, password, useremail } = req.body;

    console.log(username, password, useremail);

    res.send({ message: "User data received", username, password, useremail });
});

export default router;
