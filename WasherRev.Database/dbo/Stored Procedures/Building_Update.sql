CREATE PROCEDURE Building_Update(
	@Id INT,
	@Name varchar(MAX),
	@Street varchar(MAX),
	@StreetNo INT,
	@PostCode varchar(20),
	@IsActive bit
)
AS
BEGIN
	UPDATE [dbo].[Building]
	SET Name = ISNULL(@Name, Name),
	Street = ISNULL(@Street, Street),
	StreetNo = ISNULL(@StreetNo, StreetNo),
	PostCode = ISNULL(@PostCode, PostCode),
	IsActive = ISNULL(@IsActive, IsActive)
	WHERE Id = @Id
END