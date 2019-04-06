CREATE TABLE [dbo].[Producer] (
    [Id]             INT           IDENTITY (1, 1) NOT NULL,
    [Name]           VARCHAR (MAX) NOT NULL,
    [ServicePhoneNo] VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_ProducerId] PRIMARY KEY CLUSTERED ([Id] ASC)
);

