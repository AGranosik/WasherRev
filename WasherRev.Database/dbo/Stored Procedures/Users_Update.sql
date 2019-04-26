CREATE PROCEDURE Users_Update(
	@Id INT,
	@RoleNo INT,
	@Username varchar(256),
	@Password varchar(MAX),
	@Email varchar(256),
	@BuildingId INT,
	@IsActive bit,
	@Salt varchar(MAX)
)
AS
BEGIN
	UPDATE [dbo].[Users]
	SET 
	[RoleNo] = ISNULL(@RoleNo, RoleNo),
	[Username] = [Username],
	[Password] = ISNULL(@Password, Password),
	[Email] = ISNULL(@Email, Email),
	[BuildingId] = ISNULL(@BuildingId, BuildingId),
	[IsActive] = [IsActive],
	[Salt] = [Salt]
	WHERE Id = @Id
END