
CREATE PROCEDURE Washer_GetById(
	@Id INT
)
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
	WHERE Id = @Id
END