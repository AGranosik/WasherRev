CREATE PROCEDURE Room_GetByID(
	@Id int
)
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
	WHERE Id = @Id
END