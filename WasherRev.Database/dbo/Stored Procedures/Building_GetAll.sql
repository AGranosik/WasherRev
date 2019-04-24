﻿CREATE PROCEDURE Building_GetAll
AS
BEGIN
	SELECT [Id],
	[Name],
	[Street],
	[StreetNo],
	[PostCode],
	[IsActive]
	FROM [dbo].[Building]
	WHERE [IsActive] = 1
END