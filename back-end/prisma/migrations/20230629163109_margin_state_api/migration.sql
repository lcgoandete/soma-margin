-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Margin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" INTEGER NOT NULL DEFAULT 0,
    "state_api" INTEGER NOT NULL DEFAULT 0,
    "county" INTEGER NOT NULL DEFAULT 0,
    "county_api" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Margin" ("county", "created_at", "id", "state") SELECT "county", "created_at", "id", "state" FROM "Margin";
DROP TABLE "Margin";
ALTER TABLE "new_Margin" RENAME TO "Margin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
