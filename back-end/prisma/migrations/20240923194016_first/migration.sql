-- CreateEnum
CREATE TYPE "event_subscription_status" AS ENUM ('SUBSCRIBED', 'PRESENT', 'NOT_PRESENT', 'FINISHED');

-- CreateEnum
CREATE TYPE "Activity_Nature" AS ENUM ('ENSINO', 'PESQUISA', 'GERAL', 'EXTENSAO', 'ESPORTIVA', 'CULTURAL');

-- CreateEnum
CREATE TYPE "Participation_type" AS ENUM ('ALUNO', 'AUTOR', 'BOLSISTA', 'COLABORADOR', 'ESTAGIARIO', 'MEMBRO', 'MONITOR', 'ORGANIZADOR', 'OUVINTE', 'PARTICIPANTE', 'OUTRO');

-- CreateEnum


-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'PROFESSOR', 'COORDENADOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_type" "Role" NOT NULL DEFAULT 'ALUNO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "datainicio" TIMESTAMP(3) NOT NULL,
    "datafim" TIMESTAMP(3) NOT NULL,
    "instituicao" TEXT NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "limite_vagas" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'EM ANDAMENTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "professorId" TEXT,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_aluno" (
    "id" TEXT NOT NULL,
    "subscription_status" "event_subscription_status" NOT NULL DEFAULT 'SUBSCRIBED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "event_aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividade_complementar" (
    "id" TEXT NOT NULL,
    "participation_type" "Participation_type" NOT NULL DEFAULT 'PARTICIPANTE',
    "horas_aprovadas" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT,
    "userId" TEXT,

    CONSTRAINT "atividade_complementar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_aluno" ADD CONSTRAINT "event_aluno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_aluno" ADD CONSTRAINT "event_aluno_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade_complementar" ADD CONSTRAINT "atividade_complementar_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade_complementar" ADD CONSTRAINT "atividade_complementar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
