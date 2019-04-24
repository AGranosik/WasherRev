﻿CREATE PROCEDURE Room_GetAll
AS
BEGIN
	SELECT 
	[Id],
	[Name],
	[Floor],
	[Capacity],
	[BuildingId],
	[IsActive]
	FROM [dbo].[Room]
	WHERE IsActive = 1
END