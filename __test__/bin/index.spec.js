import run from "inquirer-test";
import path from "path";
import { ENTER } from "inquirer-test";

const runner = path.join(process.cwd(), "./bin/index.js");

describe("Helperlize CLI", () => {
	describe("flows", () => {
		test("should see full flow", async () => {
			let result = await run([runner], [ENTER, ENTER, ENTER]);
			expect(result).toContain("CodeceptJS Helper Scaffolding with Helpertize");
			expect(result).toContain("Where do you want to store your Custom Helper");
		});
	});
});
