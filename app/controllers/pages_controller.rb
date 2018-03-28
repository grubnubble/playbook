class PagesController < ApplicationController
  before_action :set_page, only: [:show, :edit, :update, :destroy]
  before_action :set_section

  # GET /pages
  # GET /pages.json
  def index
    @pages = Page.where(category: params[:category_id])
  end

  # GET /pages/1
  # GET /pages/1.json
  def show
    @page_tags = PageTag.joins(:page).where(:page_tags => { :page_id => @page.id })
  end

  # GET /pages/new
  def new
    if user_signed_in?
      @page = Page.new
      @order_preset = nil
      @category = Category.find(params[:category_id])
      @page_tags = PageTag.joins(:page).where(:page_tags => { :page_id => @page.id })
    else
      redirect_to root_path
    end
  end

  # GET /pages/1/edit
  def edit
    if user_signed_in?
      @order_preset = @page.order
      @category = Category.find(params[:category_id])
      @section = Section.where(:id => Category.find(params[:category_id]).section_id).first
      @page_tags = PageTag.joins(:page).where(:page_tags => { :page_id => @page.id })
    else
      redirect_to root_path
    end
  end

  # POST /pages
  # POST /pages.json
  def create
    @page = Page.new(page_params)

    respond_to do |format|
      if @page.save
        format.html { redirect_to category_page_path(@page.category_id, @page.id), notice: 'Page was successfully created.' }
        format.json { render :show, status: :created, location: @page }
      else
        format.html { render :new }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pages/1
  # PATCH/PUT /pages/1.json
  def update
    respond_to do |format|
      if @page.update(page_params)
        format.html { redirect_to category_page_path(@page.category_id, @page.id), notice: 'Page was successfully updated.' }
        format.json { render :show, status: :ok, location: @page }
      else
        format.html { render :edit }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.json
  def destroy
    @beforecategory = Category.find(@page.category_id)
    @beforesection = Section.find(@beforecategory.section_id)
    @page.destroy
    respond_to do |format|
      format.html { redirect_to section_category_path(@beforesection.id, @beforecategory.id), notice: 'Page was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_section
      @current_category = Category.find(params[:category_id])
      @current_section = Section.find(@current_category.section_id)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_page
      @page = Page.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def page_params
      params.require(:page).permit(:title, :body_markdown, :body_html, :order, :user_id, :category_id)
    end
end
