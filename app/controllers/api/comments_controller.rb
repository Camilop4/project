class Api::CommentsController < ApplicationController
  before_action :find_feature

  def create
    @comment = @feature.comments.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      puts @comment.errors.full_messages
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def find_feature
    puts "Params: #{params[:feature_id]}"
    @feature = Earthquake.find(params[:feature_id])
  rescue ActiveRecord::RecordNotFound
    puts "Feature not found"
    render json: { error: 'Feature not found' }, status: :not_found
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
