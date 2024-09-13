import express, { Request, Response } from 'express';
import UserInfo, { IInitializeState } from '../mongoschema/applymongotype';

const router = express.Router();  // Correct instantiation

// Define a POST route
router.post('/', async (req: Request, res: Response) => {
  console.log("Received POST request");

  try {
    const newUser: IInitializeState = req.body;

    // Set the 'applied' property to true if it exists
    if (newUser) {
      newUser.applied = "applied";
    }



    // Create a new instance of UserInfo with newUser data
    const newApply = new UserInfo(newUser);
    await newApply.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/', async (req: Request, res: Response) => {
  console.log("Received GET request");

  try {
    // Fetch all user information
    const userInfo = await UserInfo.find();

    // Respond with the fetched data
    res.status(200).json(userInfo);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  console.log("Received GET request For Check");
  console.log(req.params.id);
  const userid=req.params.id;
  

  try {
    // Fetch all user information
    const userInfo = await UserInfo.findOne({userID:userid});
    console.log(userInfo);
    
    if (userInfo)
      res.status(200).json(userInfo);
   else 
    res.status(200).json([]);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  const userid = req.params.id;
  const updatedData = req.body; // Assuming the update fields are coming from the request body

  try {
    // Update user information based on userID
    const result = await UserInfo.updateOne(
      { userID: userid }, // Filter condition
      { $set: updatedData } // Update operation, setting new values
    );

    // Check if the user was updated
    if (result.modifiedCount > 0) {
      res.status(202).json("Apply has been updated successfully");
    } else {
      res.status(404).json({ message: "User not found or no changes detected" });
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
