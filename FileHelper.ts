import fs from "fs";

export default class FileHelper {
  filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }
  write(data: any) {
    const input = JSON.stringify(data);
    fs.writeFileSync(this.filename, input);
  }

  get() {
    const output = fs.readFileSync(this.filename, "utf8");
    return JSON.parse(output);
  }
}


