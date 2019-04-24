CREATE PROCEDURE Washer_GetAll
AS
BEGIN
	SELECT
	[Id],
	[Name],
	[RoomId],
	[ProducerId],
	[SinceWhen],
	[WorkedTo],
	[IsActive]
	FROM [dbo].[Washer]
	WHERE [IsActive] = 1
END