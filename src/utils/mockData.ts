import crypto from "crypto";

// copying the sparks function to generate a token which was stolen from stack overflow
function getNewToken(
  length: number,
  allowedCharacterSets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  if (length < 0) {
    throw new Error("length cannot be less than zero.");
  }

  if (!allowedCharacterSets) {
    throw new Error("allowedCharacterSets may not be empty.");
  }

  const byteSize = 0x100;
  const allowedCharSet = Array.from(new Set(allowedCharacterSets));

  if (byteSize < allowedCharSet.length) {
    throw new Error(
      `allowedCharacterSets may contain no more than ${byteSize} characters.`
    );
  }

  const result = [];
  const buf = new Uint8Array(128);

  while (result.length < length) {
    crypto.randomFillSync(buf);

    for (let i = 0; i < buf.length && result.length < length; i++) {
      const outOfRangeStart = byteSize - (byteSize % allowedCharSet.length);

      if (outOfRangeStart <= buf[i]) {
        continue;
      }

      result.push(allowedCharSet[buf[i] % allowedCharSet.length]);
    }
  }

  return result.join("");
}

function getProductHoldingId(): string {
  const letters = crypto
    .randomBytes(3)
    .toString("hex")
    .slice(0, 3)
    .toUpperCase();
  const numbers = Math.floor(10000 + Math.random() * 90000).toString();
  return `${letters}${numbers}`; // i dont know the exact format of product holding id
}

export function generateUniqueKey(): string {
  const prefix = "change-my-vehicle";
  const crmId = crypto.randomUUID(); // Random GUID for CrmId
  const productHoldingId = getProductHoldingId();
  const tokenLength = Math.floor(128 + Math.random() * (256 - 128)); // Random length between 128 and 256 copying Sparks
  const token = getNewToken(tokenLength);

  // Combine all parts using "-"
  return `${prefix}-${crmId}-${productHoldingId}-${token}`;
}
