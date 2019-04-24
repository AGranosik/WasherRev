CREATE PROCEDURE Users_GetById(
	@Id INT
)
AS
BEGIN
	SELECT 
	[Id],
	[RoleNo],
	[Username],
	[Password],
	[Salt],
	[Email],
	[RoomId],
	[IsActive]
	FROM [dbo].[Users]
	WHERE Id = @Id
END