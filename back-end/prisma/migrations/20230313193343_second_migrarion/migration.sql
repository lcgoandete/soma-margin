-- CreateTable
CREATE TABLE "settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taxa_juros_sefaz" REAL NOT NULL,
    "taxa_juros_pm" REAL NOT NULL,
    "taxa_juros_spprev" REAL NOT NULL,
    "taxa_juros_prefsp" REAL NOT NULL
);
