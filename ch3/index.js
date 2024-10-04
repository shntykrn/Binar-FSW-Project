const express = require("express"); // Import express with non-module
const fs = require("fs");
const { z } = require("zod");
const students = require("./data/students.json"); // Import data student

/* Make/initiate express application */
const app = express();
const port = 4000;

/* We need to activate body parser/reader */
app.use(express.json());

/* Make a routing and response */
app.get("/", (req, res) => {
    res.send(`Hello World, I am using nodemon!`);
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    validateParams.parse(req.params);

    // Get the id from params
    const { id } = req.params;

    // find student by id
    const student = students.find((student) => student.id == id);
    // If student has been found, it will be response the student data
    if (student) {
        res.json(student);
        return;
    }

    // If there is no student with the id that client request, it will response not found
    res.status(404).json({ message: "Student not found!" });
});

app.post("/students", (req, res) => {
    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        nickName: z.string(),
        class: z.string(),
        address: z.object({
            province: z.string(),
            city: z.string(),
        }),
        education: z
            .object({
                bachelor: z.string().optional().nullable(),
            })
            .optional()
            .nullable(),
    });

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors.map((err) => ({
                field: err.path[0],
                issue: err.message,
            })),
        });
    }

    const newStudent = {
        id: maxId + 1,
        ...req.body,
    };

    /* Add data to current array students */
    students.push(newStudent);

    // Save the latest data to json
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    // Validation for request params (id)
    const validateParams = z.object({
        id: z.string(),
    });

    const paramsResult = validateParams.safeParse(req.params);
    if (!paramsResult.success) {
        return res.status(400).json({
            message: "Invalid student ID",
            errors: paramsResult.error.errors.map((err) => ({
                field: err.path[0],
                issue: err.message,
            })),
        });
    }

    // Validation for request body (data to update)
    const validateBody = z.object({
        name: z.string().optional(),
        nickName: z.string().optional(),
        class: z.string().optional(),
        address: z
            .object({
                province: z.string().optional(),
                city: z.string().optional(),
            })
            .optional(),
        education: z
            .object({
                bachelor: z.string().optional().nullable(),
            })
            .optional()
            .nullable(),
    });

    const bodyResult = validateBody.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: bodyResult.error.errors.map((err) => ({
                field: err.path[0],
                issue: err.message,
            })),
        });
    }

    // Find student by ID
    const { id } = req.params;
    const studentIndex = students.findIndex((student) => student.id == id);

    // If student is not found
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found!" });
    }

    // Update the student data
    const updatedStudent = {
        ...students[studentIndex],
        ...req.body,
    };

    // Replace the student data in the array
    students[studentIndex] = updatedStudent;

    // Save updated students data back to JSON file
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 2),
        "utf-8"
    );

    // Return the updated student data
    res.status(200).json(updatedStudent);
});

app.delete("/students/:id", (req, res) => {
    const { id } = req.params;

    // Find the student by ID
    const studentIndex = students.findIndex((student) => student.id == id);

    // If student not found, return 404
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found!" });
    }

    // Remove student from array
    students.splice(studentIndex, 1);

    // Save the updated data to JSON file
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 2),
        "utf-8"
    );

    // Send success response
    res.status(200).json({ message: "Student deleted successfully!" });
});

/* Run the express.js application */
app.listen(port, () => {
    console.log(`The express.js app is running on port ${port}`);
});
