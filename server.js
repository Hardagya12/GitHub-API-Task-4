const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

client.connect().then(() => {
  db = client.db("github_api");
  console.log("Connected to MongoDB");
}).catch(err => console.error("Error connecting to MongoDB:", err));

// Express App
const app = express();
app.use(express.json());

// API Endpoints

// User Management
app.get("/users", async (req, res) => {
  try {
    const users = await db.collection("users").find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const user = await db.collection("users").findOne({ userId: req.params.userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    await db.collection("users").insertOne(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/users/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const updateData = req.body;
  
      const result = await db.collection("users").updateOne(
        { userId },
        { $set: updateData }
      );
  
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found or no changes made" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.delete("/users/:userId", async (req, res) => {
  try {
    await db.collection("users").deleteOne({ userId: req.params.userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Repositories
app.get("/repositories", async (req, res) => {
  try {
    const repositories = await db.collection("repositories").find({}).toArray();
    res.status(200).json(repositories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/repositories/:repoId", async (req, res) => {
  try {
    const repository = await db.collection("repositories").findOne({ repoId: req.params.repoId });
    res.status(200).json(repository);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/repositories", async (req, res) => {
  try {
    await db.collection("repositories").insertOne(req.body);
    res.status(201).json({ message: "Repository created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/repositories/:repoId", async (req, res) => {
    try {
      const { description } = req.body;
  
      // Validate input
      if (!description) {
        return res.status(400).json({ error: "Description is required." });
      }
  
      // Update the repository
      const result = await db.collection("repositories").updateOne(
        { repoId: req.params.repoId },
        { $set: { description } }
      );
  
      // Check if the repository was found and updated
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Repository not found." });
      }
  
      res.status(200).json({ message: "Repository updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "An error occurred while updating the repository." });
    }
  });
  
app.delete("/repositories/:repoId", async (req, res) => {
  try {
    await db.collection("repositories").deleteOne({ repoId: req.params.repoId });
    res.status(200).json({ message: "Repository deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Issues
app.get("/repositories/:repoId/issues", async (req, res) => {
  try {
    const issues = await db.collection("issues").find({ repoId: req.params.repoId }).toArray();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/issues", async (req, res) => {
  try {
    await db.collection("issues").insertOne(req.body);
    res.status(201).json({ message: "Issue created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.patch("/issues/:issueId/status", async (req, res) => {
    try {
      const { status } = req.body;
      const result = await db.collection("issues").updateOne(
        { issueId: req.params.issueId },
        { $set: { status } }
      );
  
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Issue status updated successfully" });
      } else {
        res.status(404).json({ message: "Issue not found or no changes made" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
app.delete("/issues/:issueId", async (req, res) => {
  try {
    await db.collection("issues").deleteOne({ issueId: req.params.issueId });
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pull Requests
app.get("/repositories/:repoId/pull-requests", async (req, res) => {
  try {
    const pullRequests = await db.collection("pullRequests").find({ repoId: req.params.repoId }).toArray();
    res.status(200).json(pullRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/pull-requests", async (req, res) => {
  try {
    await db.collection("pullRequests").insertOne(req.body);
    res.status(201).json({ message: "Pull request created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/pull-requests/:prId", async (req, res) => {
  try {
    await db.collection("pullRequests").deleteOne({ prId: req.params.prId });
    res.status(200).json({ message: "Pull request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /repositories/:repoId/commits - Fetch all commits for a repository
app.get("/repositories/:repoId/commits", async (req, res) => {
    try {
      const repoId = req.params.repoId;
      const commits = await db.collection("commits").find({ repoId }).toArray();
      res.status(200).json(commits);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // POST /commits - Create a new commit
  app.post("/commits", async (req, res) => {
    try {
      const { commitId, repoId, userId, message } = req.body;
      const createdAt = new Date();
      const newCommit = { commitId, repoId, userId, message, createdAt };
  
      await db.collection("commits").insertOne(newCommit);
      res.status(201).json({ message: "Commit created successfully", commit: newCommit });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // DELETE /commits/:commitId - Delete a commit
  app.delete("/commits/:commitId", async (req, res) => {
    try {
      const commitId = req.params.commitId;
      const result = await db.collection("commits").deleteOne({ commitId });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Commit deleted successfully" });
      } else {
        res.status(404).json({ error: "Commit not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Forks and Stars
app.post("/forks", async (req, res) => {
  try {
    await db.collection("forks").insertOne(req.body);
    res.status(201).json({ message: "Fork created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/stars", async (req, res) => {
  try {
    await db.collection("stars").insertOne(req.body);
    res.status(201).json({ message: "Repository starred successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
