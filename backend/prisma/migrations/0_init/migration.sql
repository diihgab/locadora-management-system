-- CreateTable
CREATE TABLE `Filme` (
                         `id` INTEGER NOT NULL AUTO_INCREMENT,
                         `titulo` VARCHAR(191) NOT NULL,
                         `genero` VARCHAR(191) NOT NULL,
                         `anoLancamento` INTEGER NOT NULL,
                         `status` VARCHAR(191) NOT NULL,
                         `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                         `updatedAt` DATETIME(3) NOT NULL,

                         PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;