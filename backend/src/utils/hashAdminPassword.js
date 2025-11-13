import bcrypt from "bcryptjs";
const plainPassword ="Admin123!";

const run = async () => {
try {
    const hash = await bcrypt.hash(plainPassword,10);
    console.log("Plain password", plainPassword);
    console.log("Hashed password", hash);
} catch (error) {
    console.error("Error hashing password:", error.message);
} finally {
    process.exit(0);
}
};
run();